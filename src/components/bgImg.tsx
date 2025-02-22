import Image from "next/image";
import bg from "@/assets/bg.jpg";

const BackgroundImage = () => {
  return (
    <>
      <Image
        src={bg}
        alt="BG Image"
        className="absolute h-full w-full object-cover brightness-[0.45]"
      />
    </>
  );
};

export default BackgroundImage;
