

export default async function  getExchangeRate(){
        try{
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/CUP')
            const data = await response.json()
            return data.rates.KES
        }catch(e){
            console.log(e)
        }
    }
