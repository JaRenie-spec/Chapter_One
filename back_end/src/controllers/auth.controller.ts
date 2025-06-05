import { Request, Response } from "express";
import { loginToKeycloak, logoutFromKeycloak } from "../services/auth.service";

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, error: "Identifiants requis" });
  }

  try {
    const tokens = await loginToKeycloak(username, password);
    res.status(200).json({ success: true, data: tokens });
  } catch (err) {
    console.error("Erreur login :", err);
    res.status(401).json({ success: false, error: "Login invalide" });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ success: false, error: "refreshToken manquant" });
  }

  try {
    await logoutFromKeycloak(refreshToken);
    res.status(200).json({ success: true, message: "Déconnexion réussie" });
  } catch (err) {
    console.error("Erreur logout :", err);
    res.status(500).json({ success: false, error: "Erreur lors de la déconnexion" });
  }
};
