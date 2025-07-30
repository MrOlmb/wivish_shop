import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Import the products data table (we'll create this next)
// import ProductsDataTable from "@/components/dashboard/tables/products-data-table";

interface ProductsPageProps {
  params: {
    storeUrl: string;
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  // Get store information
  const store = await db.store.findUnique({
    where: {
      url: params.storeUrl,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/dashboard/seller");
  }

  // Get products for this store
  let products = [];
  try {
    products = await db.product.findMany({
      where: {
        storeId: store.id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        subCategory: {
          select: {
            name: true,
          },
        },
        variants: {
          include: {
            sizes: true,
            colors: true,
            images: {
              take: 1,
            },
            _count: {
              select: {
                sizes: true,
              },
            },
          },
        },
        _count: {
          select: {
            variants: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array if there's an error
    products = [];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-gray-600">
            Gérez les produits de votre magasin
          </p>
        </div>
        <Link href={`/dashboard/seller/stores/${params.storeUrl}/products/new`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau produit
          </Button>
        </Link>
      </div>

      {/* Products List/Table */}
      <div className="bg-white rounded-lg border">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">Aucun produit</h3>
              <p className="text-gray-500">
                Commencez par créer votre premier produit.
              </p>
            </div>
            <Link href={`/dashboard/seller/stores/${params.storeUrl}/products/new`}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer un produit
              </Button>
            </Link>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    {product.variants[0]?.images[0] ? (
                      <img
                        src={product.variants[0].images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Plus className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.brand}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {product.category?.name} → {product.subCategory?.name}
                      </span>
                      <span className="text-gray-500">
                        {product._count.variants} variante(s)
                      </span>
                    </div>
                    
                    {/* Pricing from first variant */}
                    {product.variants[0]?.sizes.length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-600">
                          €{Math.min(...product.variants[0].sizes.map(s => s.price - (s.price * s.discount / 100)))}
                          {product.variants[0].sizes.length > 1 && ' - '}
                          {product.variants[0].sizes.length > 1 && 
                            `€${Math.max(...product.variants[0].sizes.map(s => s.price - (s.price * s.discount / 100)))}`
                          }
                        </span>
                        <span className="text-sm text-gray-500">
                          Stock: {product.variants[0].sizes.reduce((acc, size) => acc + size.quantity, 0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Voir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}