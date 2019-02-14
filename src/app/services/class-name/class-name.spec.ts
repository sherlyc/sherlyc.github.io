import { TestBed } from '@angular/core/testing';
import { ClassNameService } from './class-name.service';

describe('ClassNameService', () => {
  let classNameService: ClassNameService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    classNameService = TestBed.get(ClassNameService);
  });

  it('should generate the class name using dashCase', () => {
    const camelCaseText = 'camelCaseText';
    const result = 'camel-case-text';
    expect(classNameService.generateClassName(camelCaseText)).toEqual(result);
  });
});
