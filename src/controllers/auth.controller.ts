import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import cache from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Busca el usuario por username (puedes cambiar a email si prefieres)
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Compara la contraseña encriptada
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const accessToken = generateAccessToken(user.id);
  cache.set(user.id, accessToken, 60 * 30); // Guardar token por 30 minutos

  return res.status(200).json({
    message: "Login exitoso",
    accessToken,
  });
};

export const getTimeToken = (
  req: Request<{}, {}, {}, { userId?: string }>,
  res: Response
) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Falta userId en query" });
  }

  const ttl = cache.getTtl(userId);
  console.log(userId);
  console.log(ttl);

  if (!ttl) {
    return res.status(404).json({ message: "Token no existente :o" });
  }

  const now = Date.now();
  const timeleft = Math.floor((ttl - now) / 1000);
  const expTime = dayjs(ttl).format("HH:mm:ss");

  return res.status(200).json({
    message: "Token existente",
    timeleft,
    expTime,
  });
};

export const updateToken = (req: Request, res: Response) => {
  const { userId } = req.params;

  const ttl = cache.getTtl(userId); // obtiene el timestamp de expiración

  if (!ttl) {
    return res.status(404).json({ message: "Token no existe" });
  }

  const newTimeTtl = 60 * 15; // nuevo tiempo de expiración (15 min)
  cache.ttl(userId, newTimeTtl); // actualiza el timestamp de expiración

  return res.json({ message: "Token actualizado" });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const { userEmail } = req.query;
  const usersList = await User.find(); // encontrar todos los registros
  const usersByEmail = await User.find({ status: true }); // encontrar por username

  console.log(usersByEmail);
  return res.json({ usersList });
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar contraseña
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      createDate: Date.now(),
      status: true,
    });
    const user = await newUser.save();
    return res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(426).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, password, role, phone } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (phone) updateData.phone = phone;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10); // Encriptar nueva contraseña
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// --- BORRADO LÓGICO ---
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { status: false, deleteDate: new Date() },
      { new: true }
    );
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
