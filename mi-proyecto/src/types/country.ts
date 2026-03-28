export type Country = {
   cca2: string
   flags: {
      png: string
      alt: string
   } 
   name: Name
   capital: string[]
   region: string
   subregion: string
   population: number
   languages: string
}

type Name = {
   common: string
   official: string
}

export default Country