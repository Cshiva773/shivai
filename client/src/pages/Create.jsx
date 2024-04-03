import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'

import { Form, Loader } from '../components'
export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://shivai.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if(form.prompt){
      try{
        setGeneratingImage(true);
        const response = await fetch('https://shivai.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      }
      catch(error){
        alert(error)
      }
      finally{
        setGeneratingImage(false);
      }
    }
    else{
      alert('Please enter a prompt')
    }
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[48px]">Unlock Your Imagination with AI Art</h1>
        <p className="mt-2 text-[#666e75] text-[20px] max-w-[800px]">
          Explore a realm of boundless creativity with AI-generated art. Our curated collection showcases captivating visuals brought to life by AI algorithms. From mesmerizing landscapes to abstract compositions, each artwork is a testament to the power of artificial intelligence in shaping new dimensions of expression.
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
          <Form
            labelName='Your Name'
            type='text'
            name='name'
            placeholder='Will Smith'
            value={form.name}
            handleChange={handleChange}
          />
          <Form
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='an armchair in the shape of an avocado'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64 h-64 flex justify-center items-center overflow-hidden'>
            {Form.photo ? (
              <img src={Form.photo} alt={Form.prompt} className='w-full h-full object-cover rounded-lg' />
            ) : (
              <img src={preview} alt={preview} className='w-9/12 h-9/12 object-contain opacity-50' />
            )}
          </div>
          
          

        </div>
        <p className="mt-10 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
        <div className='flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='mt-6 w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 rounded-md text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ease-in-out'
          >
            {generatingImage ? 'Generating...' : 'Generate Artwork'}
          </button>
          <button
            type='submit'
           
            className='mt-6 w-full py-4 px-6 bg-green-500 hover:bg-green-600 focus:bg-green-600 rounded-md text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ease-in-out'
          >
            {loading ? 'Sharing...' : 'Share with Community !!!'}
          </button>
        </div>
      </form>
    </section>
  )
}