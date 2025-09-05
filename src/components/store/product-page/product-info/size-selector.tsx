import { CartProductType } from "@/lib/types";
import { Size } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useCallback } from "react";

interface Props {
  sizes: Size[];
  sizeId: string | undefined;
  handleChange: (property: keyof CartProductType, value: any) => void;
  setSizeId: Dispatch<SetStateAction<string>>;
}

const SizeSelector: FC<Props> = ({
  sizeId,
  setSizeId,
  sizes,
  handleChange,
}) => {
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleCartProductToBeAddedChange = useCallback((property: keyof CartProductType, value: any) => {
    handleChange(property, value);
  }, [handleChange]);

  useEffect(() => {
    if (sizes.length > 0) {
      handleCartProductToBeAddedChange("size", sizes[0].size);
    }
  }, [sizes, handleCartProductToBeAddedChange]);

  const handleSelectSize = (size: Size) => {
    setSizeId(size.id);
    handleCartProductToBeAddedChange("size", size.size);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <span
          key={size.size}
          className={`border rounded-full px-5 py-1 cursor-pointer transition-all hover:bg-orange-background hover:text-white ${
            size.id === sizeId ? "bg-orange-background text-white" : ""
          }`}
          onClick={() => handleSelectSize(size)}
        >
          {size.size}
        </span>
      ))}
    </div>
  );
};

export default SizeSelector;
