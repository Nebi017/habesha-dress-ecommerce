import React from 'react';
import Title from '../components/Title';
import about from '../assets/about.jpg';
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={about} alt="About us" />
        <div>
          <p className="mb-10">
            Welcome to Jedid Store, your go-to destination for exquisite handmade traditional
            Ethiopian and Eritrean clothing. Our store was born from a deep love for the rich
            cultural heritage of Ethiopia, and we are dedicated to bringing the beauty of our
            traditions to the world.
          </p>

          <b className="text-gray-800  text-lg font-semibold">Our Mission</b>
          <p className="mb-10">
            At Jedid Store, our mission is to celebrate the artistry and craftsmanship of Ethiopian
            textiles. We believe that clothing is more than just fabric; it is a reflection of identity,
            culture, and history. Our goal is to share these stories through unique pieces that resonate
            with the spirit of our communities.
          </p>

          <b className="text-indigo-600 text-md font-bold mt-4">Our Products</b>
          <p className="mb-4">
            We offer a curated selection of beautifully crafted garments, from elegant dresses and
            intricate shawls to traditional outfits for special occasions. Each piece is handmade by
            skilled artisans using time-honored techniques and high-quality materials. Our collection
            showcases vibrant colors, intricate patterns, and stunning details that embody the essence
            of Ethiopian culture.
          </p>
        </div>
      </div>
      <div className='text-4xl py-4'>
       <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance</b>
        <p className='text-gray-600'>We meticulously select and vet each 
product to ensure it meets our 
stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>With our user-friendly interface and 
hassle-free ordering process, shopping 
has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Our team of dedicated professionals is 
here to assist you the way, ensuring 
your satisfaction is our top priority.</p>
        </div>

      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;
