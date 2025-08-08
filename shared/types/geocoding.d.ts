export {}

declare global {
  interface reverse_search {
    request: {
        lat: "string",
        lng: "string",
    },
    result: {
        address_components: [
            {
                long_name: "string",
                short_name: "string",
                types: ["string"],
            }
        ],
        formatted_address: "string",
    }
  }
}