import { ClassNameService } from './class-name.service';

describe('ClassNameService', () => {
  it('should add dash to camel case text', () => {
    const camelCaseText = 'camelCaseText';
    const result = 'camel-case-text';

    expect(ClassNameService.generateClassName(camelCaseText)).toEqual(result);
  });

  it('should add dash to camel case variant two', () => {
    const camelCaseText = 'camelKCaseText';
    const result = 'camel-kcase-text';

    expect(ClassNameService.generateClassName(camelCaseText)).toEqual(result);
  });

  it('should add dash to text with apostrophe', () => {
    const sourceText = `Editors' Picks`;
    const result = 'editors-picks';

    expect(ClassNameService.generateClassName(sourceText)).toEqual(result);
  });

  it('should add dash to text with apostrophe', () => {
    const sourceText = `Editor's Picks`;
    const result = 'editors-picks';

    expect(ClassNameService.generateClassName(sourceText)).toEqual(result);
  });

  it('should add dash to text with ampersand', () => {
    const sourceText = `Life & Style`;
    const result = 'life-style';

    expect(ClassNameService.generateClassName(sourceText)).toEqual(result);
  });

  it('should add dash to text with space', () => {
    const sourceText = `Top   Picks`;
    const result = 'top-picks';

    expect(ClassNameService.generateClassName(sourceText)).toEqual(result);
  });

  it('should remove dots from text', () => {
    const sourceText = `newsroom.co.nz`;
    const result = 'newsroomconz';

    expect(ClassNameService.generateClassName(sourceText)).toEqual(result);
  });

  it('should add dash to text with numbers', () => {
    const sourceText = `news. 123`;
    const result = 'news-123';

    expect(ClassNameService.generateClassName(sourceText)).toEqual(result);
  });
});
