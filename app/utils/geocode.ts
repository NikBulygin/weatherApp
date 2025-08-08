export async function reverseGeocode(lat: string, lng: string) {
    const config = useRuntimeConfig();
    const apiUrl = `${config.public.geocoding_api}json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GEOCODING_API_KEY}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
    }
    const data: reverse_search = await response.json();
    if (!data || !data.result) {
        throw new Error('Invalid response from Geocoding API');
    }
    return {
        address: data.result.formatted_address,
        components: data.result.address_components.map(component => ({
            long_name: component.long_name,
            short_name: component.short_name,
            types: component.types,
        })),
    };
}