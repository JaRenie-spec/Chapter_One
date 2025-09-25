import { PrismaClient } from "@prisma/client";
import { CreateAuthorDTO } from "../types";

const prisma = new PrismaClient();

// Créer un nouvel auteur
export const createAuthor = async (data: CreateAuthorDTO) => {
  try {
    return await prisma.author.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        books: true,
        events: true,
        reviews: true,
      },
    });
  } catch (err) {
    console.error("Erreur création auteur :", err);
    throw new Error("Impossible de créer l'auteur.");
  }
};

// Lister tous les auteurs (avec relations)
export const getAllAuthors = async () => {
  try {
    return await prisma.author.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: {
        books: true,
        events: true,
        reviews: true,
      },
    });
  } catch (err) {
    console.error("Erreur récupération auteurs :", err);
    throw new Error("Impossible de récupérer les auteurs.");
  }
};

// Récupérer un auteur par ID (avec relations)
export const getAuthorById = async (id: string) => {
  try {
    const author = await prisma.author.findFirst({
      where: { id: id, deletedAt: null },
      include: {
        books: true,
        events: true,
        reviews: true,
      },
    });

    if (!author) {
      throw new Error("Auteur non trouvé.");
    }

    return author;
  } catch (err) {
    console.error("Erreur récupération auteur par ID :", err);
    if (err instanceof Error) {
      throw new Error(err.message || "Erreur lors de la recherche de l’auteur.");
    }
    throw new Error("Erreur lors de la recherche de l’auteur.");
  }
};

// Mettre à jour un auteur
export const updateAuthor = async (
  id: string,
  data: Partial<CreateAuthorDTO>
) => {
  try {
    return await prisma.author.update({
      where: { id: id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  } catch (err) {
    console.error("Erreur mise à jour auteur :", err);
    throw new Error("Impossible de mettre à jour l’auteur.");
  }
};

// Supprimer un auteur (soft delete)
export const deleteAuthor = async (id: string) => {
  try {
    return await prisma.author.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (err) {
    console.error("Erreur suppression auteur :", err);
    throw new Error("Impossible de supprimer l’auteur.");
  }
};
