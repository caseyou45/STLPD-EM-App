import express, { Express, Request, Response, response } from "express";

export default async function (req: Request, res: Response) {
  return res.render("index");
}
