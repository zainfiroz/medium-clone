import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@zainfiroz/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();


userRouter.post('/signup', async (c) => {
	try {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success, error } = signupInput.safeParse(body)
	if (!success) {
		c.status(400);
		return c.json({message: "Incorrect Inputs", error: error?.errors});
	}

	
		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: body.password,
				name: body.name,
			}
		});

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.text(jwt);
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})


userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body = await c.req.json();
	const { success, error } = signinInput.safeParse(body)

	if (!success) {
		c.status(400);
		return c.json({message: "Incorrect Inputs", error: error?.errors});
	}

	const user = await prisma.user.findUnique({
		where: {
			username: body.username,
			password: body.password,
		}
	})

	if(!user) {
		c.status(403);
		return c.json({message: "User not Found"})
	}

	const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
	return c.text(jwt);
})