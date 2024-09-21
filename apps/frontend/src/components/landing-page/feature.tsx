import { features } from "@/constant";
import Image from "next/image";

export const FeatureSection = () => {
  return (
    <section className="container mx-auto max-w-7xl my-16 sm:my-32">
      <h3 className="text-xl sm:text-2xl text-center lg:text-start xl:text-3xl font-[600] lg:px-10 xl:px-0">
        Easy steps to create and sell your
      </h3>

      <div className="w-full h-fit grid grid-cols-2 lg:grid-cols-4 mt-6 sm:mt-16 md:mt-20 xl:mt-10 gap-10 px-5 xl:px-0">
        {features.map((f) => (
          <div key={f.id} className="flex flex-col items-center h-full">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-muted-2 rounded-lg flex items-center justify-center p-4 max-w-12 max-h-12 sm:max-w-20 sm:max-h-20">
                <Image src={f.icon} alt={f.label} width={30} height={30} />
              </div>

              <h3 className="text-base sm:text-xl text-center my-4">
                {f.label}
              </h3>
              <p className="text-xs sm:text-base text-center w-full text-muted-foreground">
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
