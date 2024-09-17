import { features } from "@/constant";
import Image from "next/image";

export const FeatureSection = () => {
  return (
    <section className="container mx-auto max-w-7xl my-32">
      <h3 className="text-3xl font-[600]">
        Easy steps to create and sell your
      </h3>

      <div className="w-full h-fit grid grid-cols-4 mt-10 gap-10">
        {features.map((f) => (
          <div key={f.id} className="flex flex-col items-center h-full">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-muted-2 rounded-lg flex items-center justify-center p-4 max-w-20 max-h-20">
                <Image src={f.icon} alt={f.label} width={30} height={30} />
              </div>

              <h3 className="text-xl my-4">{f.label}</h3>
              <p className="text-center w-full text-muted-foreground">
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
