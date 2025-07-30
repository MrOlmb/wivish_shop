import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface SellerStorePageProps {
  params: {
    storeUrl: string;
  };
}

export default async function SellerStorePage({ params }: SellerStorePageProps) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center space-x-4">
          {store.logo && (
            <img
              src={store.logo}
              alt={store.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{store.name}</h1>
            <p className="text-gray-600">
              Statut: 
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                store.status === 'ACTIVE' 
                  ? 'bg-green-100 text-green-800' 
                  : store.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {store.status === 'ACTIVE' && 'Actif'}
                {store.status === 'PENDING' && 'En attente'}
                {store.status === 'SUSPENDED' && 'Suspendu'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Produits totaux</h3>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Commandes ce mois</h3>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-500">Revenus ce mois</h3>
          <p className="text-2xl font-bold text-gray-900">€0</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">Ajouter un produit</h3>
            <p className="text-sm text-gray-500">Créer un nouveau produit</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">Voir les commandes</h3>
            <p className="text-sm text-gray-500">Gérer vos commandes</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">Paramètres</h3>
            <p className="text-sm text-gray-500">Configurer votre magasin</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">Livraison</h3>
            <p className="text-sm text-gray-500">Configurer la livraison</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune activité récente</p>
        </div>
      </div>
    </div>
  );
}