import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Features from "../Features.jsx";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);
    useEffect(() => {
        if (!id) {
            return; 
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setFeatures(data.features);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos, 
            description, features, extraInfo, 
            checkIn, checkOut, maxGuests, price,
        };
        if (id) {
            await axios.put('/places',  
            {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            await axios.post('/places', placeData); 
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
                <form onSubmit={savePlace}>
                    <h2 className="text-xl mt-4">Title</h2>
                    <input type="text" value={title} onChange={ev=> setTitle(ev.target.value)} placeholder="For example: My lovely apartment"/>
                    <h2 className="text-xl mt-4">Address</h2>
                    <input type="text" value={address} onChange={ev=> setAddress(ev.target.value)}/>
                    <h2 className="text-xl mt-4">Photos</h2>
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
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
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
                        <div>
                            <h3 className="mt-2 -mb-1">Price per night</h3>
                            <input type="number" 
                                   value={price} 
                                   onChange={ev=> setPrice(ev.target.value)}/>
                        </div>
                    </div>
                    <button className="primary my-4">Save</button>
                </form>
            </div>
    )
}