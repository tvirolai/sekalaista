#include <iostream>

int add(int x, int y)
{
  return x + y;
}

int multiply(int z, int w)
{
  return z * w;
}

int main()
{
  using namespace std;
  cout << add(4, 5) << endl;
  cout << multiply(2, 3) << endl;

  cout << add(1 + 2, 3 * 4) << endl;

  int a = 5;
  cout << add(a, a) << endl;

  cout << add(1, multiply(2, 3)) << endl;
  cout << add(1, add(2, 3)) << endl;

  return 0;
}