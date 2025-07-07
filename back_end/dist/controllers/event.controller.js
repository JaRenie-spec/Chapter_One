"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * GET /events
 */
const findAll = async (_req, res) => {
    const events = await prisma.event.findMany({
        include: {
            author: {
                select: { pseudo: true, firstName: true, lastName: true }
            }
        }
    });
    res.json(events);
};
exports.findAll = findAll;
/**
 * GET /events/:id
 */
const findOne = async (req, res) => {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            author: {
                select: { pseudo: true, firstName: true, lastName: true }
            }
        }
    });
    if (!event) {
        res.status(404).json({ error: 'Événement non trouvé' });
        return;
    }
    res.json(event);
};
exports.findOne = findOne;
/**
 * POST /events
 */
const create = async (req, res) => {
    const { title, description, dateEvent, authorId: bodyAuthorId } = req.body;
    const { sub, roles } = req.user;
    const isAdmin = roles.includes('admin');
    // Un auteur non-admin ne peut pas créer pour un autre auteur
    if (!isAdmin && bodyAuthorId && bodyAuthorId !== sub) {
        res.status(403).json({ error: 'Impossible de créer un événement pour un autre auteur' });
        return;
    }
    const finalAuthorId = isAdmin ? bodyAuthorId || sub : sub;
    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                dateEvent: new Date(dateEvent),
                authorId: finalAuthorId
            }
        });
        res.status(201).json(newEvent);
    }
    catch (err) {
        console.error('Erreur création événement:', err);
        res.status(500).json({ error: 'Erreur lors de la création de l\'événement.' });
    }
};
exports.create = create;
/**
 * PUT /events/:id
 */
const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, dateEvent, authorId: bodyAuthorId } = req.body;
    const { sub, roles } = req.user;
    const isAdmin = roles.includes('admin');
    // Vérifier existence
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
        res.status(404).json({ error: 'Événement non trouvé' });
        return;
    }
    // Permissions
    if (!isAdmin && event.authorId !== sub) {
        res.status(403).json({ error: 'Impossible de modifier cet événement' });
        return;
    }
    if (!isAdmin && bodyAuthorId && bodyAuthorId !== sub) {
        res.status(403).json({ error: 'Impossible de changer l\'auteur de l\'événement' });
        return;
    }
    const finalAuthorId = isAdmin ? bodyAuthorId || event.authorId : sub;
    try {
        const updated = await prisma.event.update({
            where: { id },
            data: {
                title,
                description,
                dateEvent: new Date(dateEvent),
                authorId: finalAuthorId
            }
        });
        res.json(updated);
    }
    catch (err) {
        console.error('Erreur mise à jour événement :', err);
        res.status(500).json({ error: 'Impossible de mettre à jour l\'événement.' });
    }
};
exports.update = update;
/**
 * DELETE /events/:id
 */
const remove = async (req, res) => {
    const { id } = req.params;
    const { sub, roles } = req.user;
    const isAdmin = roles.includes('admin');
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
        res.status(404).json({ error: 'Événement non trouvé' });
        return;
    }
    if (!isAdmin && event.authorId !== sub) {
        res.status(403).json({ error: 'Impossible de supprimer cet événement' });
        return;
    }
    try {
        await prisma.event.delete({ where: { id } });
        res.sendStatus(204);
    }
    catch (err) {
        console.error('Erreur suppression événement :', err);
        res.status(500).json({ error: 'Impossible de supprimer l\'événement.' });
    }
};
exports.remove = remove;
