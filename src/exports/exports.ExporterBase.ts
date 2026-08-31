import { StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { FieldFormmater } from 'src/utils/FieldFormatrer';
import * as lockfile from 'proper-lockfile';

export abstract class ExporterBase {
  abstract Export(id: string, periodId: string, employees: Array<string> ): Promise<string>;

  //protected methods
  protected createLine(fields: any): string {
    const fieldFormmater = new FieldFormmater();
    return fields
      .map((field) =>
        fieldFormmater.formatField(
          field.value,
          field.length,
          field.isNumber,
          field.align,
        ),
      )
      .join('');
  }

  protected streamWriteArrayToFile(filepath: string, lines: string[]) {
    const stream = createWriteStream(join(__dirname, filepath), {
      flags: 'w',
      encoding: 'utf-8',
    });
    stream.on('error', (err) => console.error('Write error', err));
    lines.forEach((line) => stream.write(line + '\n'));
    stream.end(() => console.log('Finished writing file.'));
  }

  //end protected methods

  public async streamFile(
    id: string,
    periodId: string,
    employees: Array<string>    
  ): Promise<StreamableFile> {
    const streamableFilename: string = await this.Export(id, periodId, employees);

    while (await lockfile.check(join(__dirname, streamableFilename))) {
      await new Promise((res) => setTimeout(res, 500));
    }

    const file = createReadStream(join(__dirname, streamableFilename));
    //return new StreamableFile(file);
    const dispositionValue = `attachment; filename="${streamableFilename}"`;
    return new StreamableFile(file, {
      type: 'application/octet-stream',
      disposition: dispositionValue,
    });
  }
}
