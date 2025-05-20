Expr
  = Number
  / '(' left:Expr '+' right:Expr ')' { return left + right; }

Number
  = [0-9]+ { return Number(text()); }
