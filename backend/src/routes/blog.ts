import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@zainfiroz/medium-common";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables: {
		userId: any,
	}
}>();

blogRouter.use('/*', async (c, next) => {
	const header = c.req.header("authorization") || "";
	// const token = header.split("")[1];

	try {
		const user = await verify(header, c.env.JWT_SECRET);

		if (user) {
			c.set("userId", user.id)
			await next();
		} else {
			c.status(403);
			return c.json({ message: 'Unauthorized' });
		}
	} catch (e) {
		console.error("Middleware Throwing Issues", e);
		c.status(403);
		return c.json({ message: 'Internal Server Error' });
	}

})



blogRouter.post('/', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const body = await c.req.json();
		console.log("Incoming request body:", body);
		const { success, error } = createBlogInput.safeParse(body)
		
			if (!success) {
				console.error("Validation error:", error.errors);
				c.status(400);
				return c.json({message: "Incorrect Inputs", error: error?.errors});

			}
		const userId = c.get("userId");
		console.log("Creating blog for user:", userId);

		const blog = await prisma.blog.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: userId,
			},
		});

		return c.json({ id: blog.id });
	} catch (error) {
		console.error("Error during blog creation:", error);
		c.status(500);
		return c.json({ message: 'Internal Server Error' });
	}
});

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate())

	const blogs = await prisma.blog.findMany({})

	return c.json({blogs})
})


blogRouter.get('/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate())
	const id = c.req.param('id');
	try {
		const blog = await prisma.blog.findFirst({
			where: {
				id: Number(id)
			},
			select : {
				id: true,
				title: true,
				content: true,
				author: {
					select: {
						name: true
					}
				}
			}
		})

		return c.json({ blog });
	} catch (e) {
		c.status(403);
		return c.json({ message: 'Error While Fetching Blog blog' })
	}

})



blogRouter.put('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate())
	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body)
	
		if (!success) {
			c.status(411);
			return c.json({message: "Incorrect Inputs"});
		}

	const blog = await prisma.blog.update({
		where: {
			id: body.id
		},
		data: {
			title: body.title,
			content: body.content,
		}
	})

	return c.json({ message: "Blog Updated", blog })
})


