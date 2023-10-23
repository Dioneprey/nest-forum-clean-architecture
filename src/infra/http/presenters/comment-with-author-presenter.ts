import { CommentWithAuthor } from "src/domain/forum/enterprise/entities/value-objects/comment-with-author";

export class CommentWithAuthorPresenter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toHTTP(commentWithAuthor: CommentWithAuthor) {
    return {
      commentId: commentWithAuthor.commentId.toString(),
      authorId: commentWithAuthor.authorId.toString(),
      authorName: commentWithAuthor.author,
      content: commentWithAuthor.content,
      createdAt: commentWithAuthor.createdAt,
      updatedAt: commentWithAuthor.updatedAt,
    };
  }
}