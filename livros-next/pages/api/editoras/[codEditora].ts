import { NextApiRequest, NextApiResponse } from "next";
import { controleEditora } from ".";

async function handler(req: NextApiRequest, res: NextApiResponse){
  try {
    if(req.method === "GET"){
      const { codEditora } = req.query;

      if(!codEditora){
        return res.status(400).end("Parâmetro codEditora faltando");
      }

      const codEditoraNum = Number(codEditora);

      if(isNaN(codEditoraNum)){
        return res.status(400).end("Parâmetro codEditora inválido");
      }

      const nomeEditora = await controleEditora.getNomeEditora(codEditoraNum);

      if(!nomeEditora){
        return res.status(404).end("Editora não encontrada");
      }

      res.status(200).json({nome: nomeEditora});

    } else{
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Erro interno do servidor");
  }
}

export default handler;