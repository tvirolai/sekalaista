public class Testi {
  public static void main(String[] args) {
    String merkkijono = "Voihan Vimpeli notta onkin kova kahvinjano!";
    Integer aCount = 0;
    for (int i = 0; i < merkkijono.length(); i++) {
      if (merkkijono.charAt(i) == 'a') {
        System.out.print("Löytyi A! ");
        aCount++;
      }
    }
    System.out.println("\nYhteensä niitä oli sanassa (" + merkkijono + ") " + aCount + ".");
  }
}