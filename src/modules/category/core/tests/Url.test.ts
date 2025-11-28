import InvalidParameters from "../../../../shared/errors/InvalidParameters";
import Url from "../objects/URL";

describe('Url object tests', () => {
  let url: Url;

  beforeEach(() => {
    url = new Url();
  });

  //Valid cases
  it('Should update the URL successfully with http', () => {
    url.setUrl('http://localhost.com');
    expect(url).toHaveProperty('url', 'http://localhost.com');
  });

  it('Should accept a valid https URL', () => {
    url.setUrl('https://example.com');
    expect(url).toHaveProperty('url', 'https://example.com');
  });

  it('Should accept a URL with subdomain', () => {
    url.setUrl('https://sub.example.com');
    expect(url).toHaveProperty('url', 'https://sub.example.com');
  });

  it('Should accept a URL with port', () => {
    url.setUrl('https://example.com:8080');
    expect(url).toHaveProperty('url', 'https://example.com:8080');
  });

  it('Should accept a URL with path', () => {
    url.setUrl('https://example.com/path/to/resource');
    expect(url).toHaveProperty('url', 'https://example.com/path/to/resource');
  });

  it('Should accept a URL with query parameters', () => {
    url.setUrl('https://example.com/search?q=jest&lang=en');
    expect(url).toHaveProperty('url', 'https://example.com/search?q=jest&lang=en');
  });

  it('Should accept a URL with hash fragment', () => {
    url.setUrl('https://example.com/page#section2');
    expect(url).toHaveProperty('url', 'https://example.com/page#section2');
  });

  it('Should accept a URL with path, query and hash', () => {
    url.setUrl('https://example.com/products/item?id=10#reviews');
    expect(url).toHaveProperty('url', 'https://example.com/products/item?id=10#reviews');
  });

  //Invalid cases
  it('Should throw if protocol is missing', () => {
    expect(() => url.setUrl('example.com')).toThrow(InvalidParameters);
  });

  it('Should throw if using unsupported protocol', () => {
    expect(() => url.setUrl('ftp://example.com')).toThrow(InvalidParameters);
  });

  it('Should throw if domain lacks top-level part', () => {
    expect(() => url.setUrl('https://example')).toThrow(InvalidParameters);
  });

  it('Should throw if domain has invalid characters', () => {
    expect(() => url.setUrl('https://exam!ple.com')).toThrow(InvalidParameters);
  });

  it('Should throw if URL has spaces', () => {
    expect(() => url.setUrl('https://exa mple.com')).toThrow(InvalidParameters);
  });

  it('Should throw if URL is empty', () => {
    expect(() => url.setUrl('')).toThrow(InvalidParameters);
  });

  it('Should throw if URL starts with // without protocol', () => {
    expect(() => url.setUrl('//example.com')).toThrow(InvalidParameters);
  });
});
