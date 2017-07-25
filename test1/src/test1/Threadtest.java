package test1;

public class Threadtest extends Thread {
	
	public static void main(String args[]) {
		
		Threadtest R1 = new Threadtest();
		R1.start();
		
		
	}
	public void run() {
		while(true) {
		System.out.println("2");
		calling();
		}
		
		
		
	}
	public static void calling() {
		
		System.exit(0);
	}

}
