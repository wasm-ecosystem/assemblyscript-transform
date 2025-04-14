declare function log(addr: usize, size: u32): void;
import { utf8 } from "../utf8ConstStr";

class C1 {
  constructor(
    public name: utf8.ConstStr,
    public length: u32
  ) {}
}

class C2 {
  public name: utf8.ConstStr;
  public length: u32;
}

export const str1 = utf8.build("test0");

export const obj: C2 = {
  length: 4,
  name: utf8.build("test1"),
};

export const arr: C1[] = [new C1(utf8.build("test2"), 4)];

function foo(str: utf8.ConstStr): void {
  str;
}

export function _start(): void {
  const str = utf8.build("test3");
  log(str.addr, str.size);
  foo(utf8.build("test4"));
}
