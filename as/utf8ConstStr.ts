export namespace utf8 {
  export class ConstStr {
    public addr: usize = 0;
    public size: u32 = 0;
  }

  export declare function build(str: string): ConstStr;

  export function build_internal(addr: usize, size: u32): ConstStr {
    return { addr: addr, size: size };
  }
}
