import { Navbar, Footer, Heading } from '../components';

const SingleData = () => {
  return (
    <>
      <Navbar />
      <div className="data-set-hero h-[100px]">
        <div className="w-full xx:w-[1518px] flex items-center xl:px-12">
          <Heading text="Home" />
          <Heading text="Data Sets" />
          <Heading text="Population" />
        </div>
        <div className="w-full xx:w-[1518px] h-[292px] bg-white rounded-[25px]">
          <p className="p-4 text-zinc-500 text-1xl font-medium ">
            Brief Description
          </p>
        </div>
      </div>
      <div className="data-section-container w-full xx:w-[1518px] px-2">
        <section className="data-section rounded-[30px]"></section>
      </div>
      <Footer />
    </>
  );
};

export default SingleData;
