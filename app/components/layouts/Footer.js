import { fetchSiteData } from '@/app/utils/wpApis';

const Footer = async () => {
  let siteData = {
    title: process.env.NEXT_PUBLIC_APP_NAME,
  };

  await fetchSiteData().then((data) => {
    siteData = data;
  });

  return (
    <div className='bg-gray-100 py-4'>
      <div className='container mx-auto px-4 lg:px-0 py-2'>
        <div className='text-center md:flex justify-between items-center'>
          <p>Copyright &copy;{new Date().getFullYear()} {siteData.title}.</p>
          <p>Developed with ❤️ by <a href={process.env.NEXT_PUBLIC_AUTHOR_URL} target='_blank' rel='noreferrer' className='underline text-blue-500'>{process.env.NEXT_PUBLIC_AUTHOR_NAME}</a>.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer