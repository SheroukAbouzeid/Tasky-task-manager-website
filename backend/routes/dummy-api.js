import { Router } from "express";

const router = Router();

router.get("/test-api", async (req, res) => {
  try {
    res.status(200).json('Hello from the backend!');
  } catch {
    res.status(500).json( 'opps somthing wrong!' );
  }
});

export default router;




