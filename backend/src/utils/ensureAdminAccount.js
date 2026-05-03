import { hashPassword, comparePassword } from "./password.js";

import { User } from "../models/User.js";

export async function ensureAdminAccount() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const name = process.env.ADMIN_NAME?.trim() || "Scholastica Admin";
  const existingAdmin = await User.findOne({ email });

  if (!existingAdmin) {
    const passwordHash = await hashPassword(password);

    await User.create({
      name,
      email,
      studentId: `ADMIN-${Date.now()}`,
      passwordHash,
      role: "admin",
      isVerifiedStudent: true,
      status: "active"
    });

    console.log(`Created admin account for ${email}`);
    return;
  }

  const passwordMatches = await comparePassword(password, existingAdmin.passwordHash);
  let updated = false;

  if (!passwordMatches) {
    existingAdmin.passwordHash = await hashPassword(password);
    updated = true;
  }

  if (existingAdmin.name !== name) {
    existingAdmin.name = name;
    updated = true;
  }

  if (existingAdmin.role !== "admin") {
    existingAdmin.role = "admin";
    updated = true;
  }

  if (!existingAdmin.isVerifiedStudent) {
    existingAdmin.isVerifiedStudent = true;
    updated = true;
  }

  if (existingAdmin.status !== "active") {
    existingAdmin.status = "active";
    updated = true;
  }

  if (updated) {
    await existingAdmin.save();
    console.log(`Synced admin account for ${email}`);
  }
}
