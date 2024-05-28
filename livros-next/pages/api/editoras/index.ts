import { NextApiRequest, NextApiResponse } from "next";
import ControleEditora from "../../../classes/control/ControleEditora";


export const controleEditora = new ControleEditora();

async function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    if(req.method === 'GET'){
      const editoras = await controleEditora.getEditoras();

      res.status(200).json(editoras);
    } else{
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch(error){
    console.error(error);
    res.status(500).end("Erro interno do Servidor");
  }
}

export default handler;