import { useEffect, useState } from "react";
const defaultCoords = [-53.58, -23.48]

export default function useGetLocation() {

    const [coords, setcoords] = useState([]);


    useEffect(() => {
        function onSuccess(position: GeolocationPosition) {
            setcoords([position.coords.latitude, position.coords.longitude])
            console.log('coordenadas encontradas', coords)
        };
        function onError() {
            setcoords(defaultCoords);
            console.log('coordenadas nao encontradas')

        };

        try {
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        } catch (error) {
            setcoords(defaultCoords);

        }
    }, [])
    return { coords }

}