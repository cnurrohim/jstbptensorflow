# JST-SOM PAGE
### MENU PAGE

### get data .xlxs convert to .JSON << DONE >>
---- > file save .xlxs as .csv
---- > convert online using http://www.convertcsv.com/csv-to-json.htm
---- > download .json file into system folder
---- > modify .json file, add: let data = [{x:y}], rename .json file .js
---- > add <script type="text/javascript" src="data/JS/2014.js"></script> to page header
---- > **other ways triggers CORS limitations**

### display .JSON into table << DONE >>
### create display navigation << DONE >>
### create tabbed menu << DONE >>

### normalize the data << DONE >>
### setting bobot << BUG >> ` ACAK BOBOT HARUSNYA TIDAK SIMPAN, SIMPAN HANYA PADA SAAT SET BOBOT `
### setting JST-SOM << DONE >>

### display map << DONE >>
### run JST-SOM << DONE >>
### display JST-SOM calculations  << DONE >>
### saving result into localStorage << DONE >>

> hasil cluster tergantung bobot, beda bobot beda hasil cluster.

# JST-BACKPROPAGATION

# training page
### show data << DONE >>
### pick data for training << DONE >>
### SET BOBOT TRAINING << DONE >>
### TRAINING << DONE >>
> Plotly.js << DONE >>
> simpan << DONE >>
> perhitungan log << JIKA DIMINTA >>

# testing page
### pick data for testing << DONE >>
> same as training data << DONE >>

### perbandingan MSE << DONE >>
> same as setting with addition of mse and epoch << DONE >>
> pick << DONE >>

### pengujian << DONE >>

# prediction page
### pick data for prediction << DONE >>
> all data << DONE >>
> pick << DONE >>

### pick JST architectur << DONE >>
> same as setting with addition of mse and epoch << DONE >>

### display map << DONE >>
### prediksi << DONE >>
### table hasil prediksi << DONE >>


### bersihkan coding
> tiap callback eventlistneter buatkan function agar sourcecode lebih ringkes

### COVER
> bagian cover bulan, tahun dihapus *OK*

### BAB 1  (pak far)
> rumusan masalah *OK*
> tujuan *OK*

### BAB III  (pak far)
> rumus tidak perlu dikasih keterangan (3.11 rumus menghitung) jika sudah menggunakan ....... (3.11) *OK*

### BAB IV  (pak far)
> bagan JST disebutkan variabelnya apa saja. *OK*
> nama tabel diatas tabel *OK*
> DFD LVL 0 entitasnya jelas *OK*
> data yang masuk ke sistem apa saja *OK*
> sistem memberi output apa saja *OK*

### DFD LEVEL 1  (pak far)
> data yang masuk harus sama dengan yang ada di DFD LVL 0 *OK*
> setiap proses memberi output apa saja *OK*
> yang disimpan didatabase apa saja dari mana *OK*

### Flowchart  (pak far)
> kurang database *OK*
> kurang output - pengujian: memberi output apa? pemetaan: output apa? *OK*

### rancangan antar muka kotak-kota (bukan screenshot) *OK*
* source code (revisi pak wiwiet)
- intinya codingnya harus lengkap (isinya fungsi ditunjukkan)
- hasil bobot
- simpan bobot
- load bobot
- prediksi (mungkin)

### BAB VI (Pak wiwiet)
> MODEL - HASIL PENELITIAN => tampilkan arsitektur (layer) tetapi input berbentuk kata-kata bukan X1,X2,X3,X4 *OK*
> DATA UJI *OK*
> PERBANDINGAN (Manual vs Software) *OK*
---- hitungan manual 1 data sisanya tampilkan dalam bentuk tabel *OK*
---- hasil berupa akurasi/tingkat presisi *OK*

### BAB VI (pak far)
> Pengujian, MSE dari data uji dan hasil feedforwad (prediksi) *OK*
> MSE kenapa bisa kecil harus tahu alasannya *OK*


### BAB VII (Pak far)
> kesimpulan 1 menjawab rumus masalah *OK*
> kesimpulan 2 menjawab tujuan *OK*

> saran tidak begitu dibaca (hiraukan) *OK*

BAB VII (Pak wiwiet)
- menunggu selesai bab VI

DAFTAR PUSTAKA

pak far
- kalau bisa jangan sampai ada space kosong

pak wiwiet
- penulisan disajikan berurutan (tabel jangan ditaruh belakangan)








The number of columns in the first matrix should be equal to the number of rows in the second

rows * cols

input 7 * 1

MATRIX bobot sebelum jadi matrix berupa array 1 * 70 dan 1 * 10
BIAS sebelum jadi matrix berupa array 1 * 10 dan 1 * 1

MATRIX BOBOT sesudah jadi object matrix 7 * 10 dan 10 * 1
BIAS sesudah jadi object matrix 1 * 10 dan 1 * 1

MATRIX BOBOT sesudah transpose 10 * 7 dan 1 * 10
BIAS sesudah transpose 10 * 1 dan 1 * 1

bobot * input
1 2 3 4 5 6 7 * 1
2				2
3				3
4				4
5				5
6				6
7				7
8
9
10


hasil new matrix(rows matrix1, cols matrix2)
	  new matrix(10, 1)


matrix perkalian

1, 2, 3, 4   1 5
5, 6, 7, 8 * 2 6
			 3 7
			 4 8
			 

= (1 * 1) + (2 * 2) + (3 * 3) + (4 * 4) =  1 + 4 + 9 + 16 = 30
= (1 * 5) + (2 * 6) + (3 * 7) + (4 * 8) = 5 + 12 + 21 + 32 = 70

matrix penambahan
1, 2, 3, 4  + 1, 2, 3, 4  = 2  4  6  8
5, 6, 7, 8	  5, 6, 7, 8    10 12 14 16