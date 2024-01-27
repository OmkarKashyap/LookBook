const HomeCard = ({ imgURL, changeBigHomeImage, bigHomeImg }) => {
    const handleClick = () => {
      if (bigHomeImg !== imgURL.bigHome) {
        changeBigHomeImage(imgURL.bigHome);
      }
    };
  
    return (
      <div
        className={`border-2 rounded-xl  ${
          bigHomeImg === imgURL.bigHome
            ? "border-orange-400"
            : "border-transparent"
        } cursor-pointer max-sm:flex-1`}
        onClick={handleClick}
      >
        <div className='flex items-center justify-center bg-center bg-cover bg-card sm:w-40 sm:h-40 rounded-xl max-sm:p-4'>
          <img
            src={imgURL.thumbnail}
            alt='shoe collection'
            width={127}
            height={103.34}
            className='object-cover w-full h-full rounded-xl'
          />
        </div>
      </div>
    );
  };
  
  export default HomeCard;