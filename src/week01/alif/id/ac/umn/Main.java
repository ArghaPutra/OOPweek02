package week01.alif.id.ac.umn;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
        Mhs melvin = new Mhs("Melvin", 5000);
        Dukun raffi = new Dukun(2);

        System.out.println("Uang saku Melvin: " + melvin.uangSaku);
        System.out.println("Melvin pergi ke dukun");
        melvin.uangSaku = raffi.gandakanUang(melvin.uangSaku);
        System.out.println("Uang saku Melvin sekarang: " + melvin.uangSaku);
    }
}

class Mhs {
    String nama;
    int uangSaku;

    Mhs(String nama, int uangSaku){
        this.nama = nama;
        this.uangSaku = uangSaku;
    }
}

class Dukun {
    int berapaX;
    Dukun(int berapaX){
        this.berapaX  = berapaX;
    }
    int gandakanUang(int uang) {
        return uang * this.berapaX;
    }
}
