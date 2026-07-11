import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10)
  console.log("New hash:", passwordHash)
  
  await prisma.adminUser.update({
    where: { username: 'admin' },
    data: { passwordHash },
  })
  console.log("Updated admin password successfully")
}
main()
