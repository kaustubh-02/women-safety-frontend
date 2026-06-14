import React, { useState } from 'react';
import api from '../api/axios';
import { AlertCircle, MapPin, Navigation } from 'lucide-react';

const SOSPage = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const sendAlert = () => {
        setLoading(true);
        setStatus("Capturing location...");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    setStatus("Sending emergency signal...");
                    await api.post('/sos/send', {
                        latitude,
                        longitude,
                        emergencyMessage: "I am in danger! Please send help to my location immediately.",
                        locationAddress: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`
                    });
                    setStatus("Alert Sent! Help is on the way.");
                    alert("EMERGENCY ALERT SENT SUCCESSFULLY! Authorities and contacts notified.");
                } catch (err) {
                    setStatus("Failed to send alert. Try again!");
                } finally {
                    setLoading(false);
                }
            }, (error) => {
                alert("Please enable location permissions to use SOS!");
                setLoading(false);
                setStatus("");
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
                <div className="bg-red-600 p-8 text-center text-white">
                    <h1 className="text-3xl font-black">EMERGENCY SOS</h1>
                    <p className="opacity-90 mt-2 font-medium">Press the button below in case of danger.</p>
                </div>
                
                <div className="p-12 flex flex-col items-center">
                    <button 
                        onClick={sendAlert}
                        disabled={loading}
                        className={`w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all active:scale-90 border-[12px] border-red-50 
                            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 animate-pulse'}`}
                    >
                        <AlertCircle size={64} className="text-white mb-2" />
                        <span className="text-white text-3xl font-black uppercase tracking-widest">SOS</span>
                    </button>
                    
                    {status && (
                        <div className="mt-8 flex items-center gap-2 text-red-700 font-bold animate-bounce bg-red-50 px-4 py-2 rounded-full">
                            <Navigation size={18} />
                            <span>{status}</span>
                        </div>
                    )}

                    <div className="mt-12 w-full grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center">
                            <MapPin className="text-pink-600 mb-2" />
                            <span className="text-xs font-bold text-gray-500 uppercase">GPS Tracking</span>
                            <span className="text-sm font-black text-gray-800">ACTIVE</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center">
                            <ShieldAlert className="text-pink-600 mb-2" />
                            <span className="text-xs font-bold text-gray-500 uppercase">Alert Mode</span>
                            <span className="text-sm font-black text-gray-800">REALTIME</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ShieldAlert = ({className, size}) => <AlertCircle className={className} size={size}/>;

export default SOSPage;