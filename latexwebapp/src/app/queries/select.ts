import { eq } from "drizzle-orm";
import { latexdb } from "../db/index";
import { images, latex } from "../db/schema";

export const selectImages = async (userId: string) => {
  const userImages = await latexdb
    .select()
    .from(images)
    .where(eq(images.userId, userId));

  return userImages;
};

export const selectImagesWithLatex = async (userId: string) => {
  const userImagesWithLatex = await latexdb
    .select({
      id: images.id,
      userId: images.userId,
      latexId: images.latexId,
      imageName: images.imageName,
      fileType: images.fileType,
      fileSize: images.fileSize,
      latexCode: latex.latexCode,
    })
    .from(images)
    .leftJoin(latex, eq(images.latexId, latex.id))
    .where(eq(images.userId, userId));

  return userImagesWithLatex;
};
