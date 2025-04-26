import { Params } from "@angular/router";

export function getUrl(baseUrl: string, version: string, actions?: string[], params: Params = {}): string {
  const parameters = new URLSearchParams();
  for (const name in params) {
    let param = params[name];
    if (param instanceof Date) {
      param = param.toISOString();
    } else if (typeof param === 'number') {
      param = param.toString();
    }
    parameters.set(name, param);
  }
  return [
    `${baseUrl}/${[version].concat(actions || []).join('/')}`,
    parameters.toString()
  ].filter(x => x?.length > 0).join('?');
}
