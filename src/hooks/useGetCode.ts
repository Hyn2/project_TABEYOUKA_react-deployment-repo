export default function getCodeByLocation(data : any, location : string) {
    const results = data.results;
    for (const obj of results) {
      if (obj.name === location) {
        return obj.code;
      }
    }
    return ""; 
  }