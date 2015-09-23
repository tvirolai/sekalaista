#include <stdio.h>

int i;

int main(int argc, char **argv)
{
  for (i = 0; i < argc; ++i) {
      printf("argv[%d]: %s\n", i, argv[i]);
  }
  printf("\nArgumentteja syötetty: %d\n\n", argc);
}
