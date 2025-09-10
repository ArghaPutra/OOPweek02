package Week03;

public class PreludeArray {

	public static void main(String[] args) {
		String[] users = new String[10];

		users[0] = "Seng Hansun";
		users[1] = "Arya Wicaksana";
		int[] numbers = { 1, 2, 3, 4, 5 };

		printArray(numbers);
		numbers = setArray();
		printArray(numbers);
	}

	public static void printArray(int[] numbers) {
		for (int i = 0; i < numbers.length; i++) {
			System.out.println(numbers[i]);
		}
	}

	public static int[] setArray() {
		int[] numbers = new int[5];
		for (int i = 0; i < 5; i++) {
			numbers[i] = i;
		}
		return numbers;
	}
}
