Expression
  = Sum

Sum
  = head:Product tail:([+-] Product)*
    {
      return tail.reduce((acc, [operator, cur]) => (
        operator === '+' ? (acc + cur) : (acc - cur)
      ), head);
    }

Product
  = head:Power tail:([*/] Power)*
    {
      return tail.reduce((acc, [operator, cur]) => (
        operator === '*' ? (acc * cur) : (acc / cur)
      ), head);
    }

Power
  = head:(Atom ('^' / '**'))* tail:Atom
    {
      return head.reduceRight((acc, [cur]) => cur ** acc, tail);
    }

Atom
  = Number
  / '+' @Power
  / '-' power:Power { return -power; }
  / '(' @Expression ')'

Number
  = SIGNIFICAND ('e'i EXPONENT)? { return Number(text()); }

SIGNIFICAND
  = [0-9]+ ('.' [0-9]*)?
  / '.' [0-9]+

EXPONENT
  = [+-]? [0-9]+
