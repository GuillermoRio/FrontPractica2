import { api } from '@/lib/api/api'

export const getAllCountries = async () => {
   const response = await api.get('all?fields=name,flags,population')
   return response.data
}

export const getCountryNameBySearch = async (name: string) => {
   const response = await api.get(`name/${name}?fields=name,flags,capital,region,population,languages,cca2`)
   return response.data
}