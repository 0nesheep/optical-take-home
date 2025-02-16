# SWE Take Home Assignment

## Setting up

Install required packages

```
npm install
```

Compile and run

```
npm run dev
```

The console should now print `Server is now on http://localhost:3000`!

Navigate to `http://localhost:3000/users` in your browser to check the initial
data, or run in your console:

```
npm run users http://localhost:3000/users
```

## Testing

There are 3 data.csv files provided in the `src/sample-data` folder:

1. `data.csv`: a csv file containing correct inputs for all rows and columns,
   including negative and 0 values.
2. `badSalaryData.csv`: a csv file containing illegal salary inputs.
3. `badColData.csv`: a csv file containing an incorrect number of columns.

In your console, run:

```
npm run upload --filePath=<file path here>
```

to test the uploads.

For example:

```
npm run upload --filePath=src/sample-data/data.csv
```

After loading, you can run

```
npm run users http://localhost:3000/users
```

again to check the new data!
