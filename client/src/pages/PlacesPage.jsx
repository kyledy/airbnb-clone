import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import Features from "../Features";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    
    async function addPhotoFromLink(ev) {
       ev.preventDefault(); 
       const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
       setAddedPhotos(prev => {
        return [...prev, filename];
       }); 
       setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
          headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
          const {data:filenames} = response;
          setAddedPhotos(prev => {
            return [...prev, ...filenames];
          });
        })
      }

    return (
    <div>
        {action !== 'new' && (
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Add new place
                </Link>
            </div>
        )}
        {action === 'new' && (
            <div>
                <form>
                    <h2 className="text-xl mt-4">Title</h2>
                    <input type="text" value={title} onChange={ev=> setTitle(ev.target.value)} placeholder="For example: My lovely apartment"/>
                    <h2 className="text-xl mt-4">Address</h2>
                    <input type="text" value={address} onChange={ev=> setAddress(ev.target.value)}/>
                    <h2 className="text-xl mt-4">Photos</h2>
                    <div className="flex gap-2">
                        <input value={photoLink} 
                         onChange={ev=> setPhotoLink(ev.target.value)} 
                         type="text" placeholder={'Upload photo from URL'}/>
                        <button onClick={addPhotoFromLink} className="bg-gray-200 px-4 rounded-2xl">Add</button>
                    </div>
                    <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="h-32 flex">
                                <img className="rounded-2xl w-full object-cover position-center" src={'http://localhost:4000/uploads/'+link} alt=""/>
                            </div>    
                        ))}
                        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                            Upload
                        </label>
                    </div>
                    <h2 className="text-xl mt-4">Description</h2>
                    <textarea value={description} onChange={ev=> setDescription(ev.target.value)} placeholder="Give us the juicy details!" />
                    <h2 className="text-xl mt-4">Features</h2>
                    <p className="text-gray-500 text-sm">Select all that apply.</p>
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <Features selected={features} onChange={setFeatures}/>
                    </div>
                    <h2 className="text-xl mt-4">Extra Info</h2>
                    <textarea value={extraInfo} onChange={ev=> setExtraInfo(ev.target.value)} placeholder="Anything else?" />
                    <h2 className="text-xl mt-4">Additional Notes</h2>
                    <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in Time</h3>
                            <input type="text" 
                                   value={checkIn} 
                                   onChange={ev=> setCheckIn(ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check Out Time</h3>
                            <input type="text" 
                                   value={checkOut} 
                                   onChange={ev=> setCheckOut(ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max Number Of Guests</h3>
                            <input type="number" 
                                   value={maxGuests} 
                                   onChange={ev=> setMaxGuests(ev.target.value)}/>
                        </div>
                    </div>
                    <button className="primary my-4">Save</button>
                </form>
            </div>
        )}
    </div>
    );
}