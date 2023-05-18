import express, { Express, Request, Response, response } from "express";
import { getByURLQuery } from "./api/call";
import { ICall } from "../models/call";

export default async function (req: Request, res: Response) {
  const calls: Error | ICall[] = await getByURLQuery(req, res);

  res.render("index", {
    calls: calls,
  });
}
//
