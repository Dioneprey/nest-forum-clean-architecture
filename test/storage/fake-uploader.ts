import {
  UploadParams,
  Uploader,
} from "src/domain/forum/application/storage/uploader";

interface Upload {
  fileName: string;
  url: string;
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = [];

  async upload({ fileName }: UploadParams) {
    const url = `${new Date().getMilliseconds} - ${fileName}`;

    this.uploads.push({
      fileName,
      url,
    });

    return { url };
  }
}
