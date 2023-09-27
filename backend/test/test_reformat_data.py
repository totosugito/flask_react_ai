import json

import pandas as pd
from io import StringIO

if __name__ == "__main__":
    response = "                gdp  happiness_index\n" \
               "count  1.000000e+01        10.000000\n" \
               "mean   5.307078e+12         6.605000\n" \
               "std    6.316971e+12         0.686897\n" \
               "min    1.181205e+12         5.120000\n" \
               "25%    1.641910e+12         6.385000\n" \
               "50%    2.651435e+12         6.800000\n" \
               "75%    4.144522e+12         7.137500\n" \
               "max    1.929448e+13         7.230000"
    df_ = pd.read_csv(StringIO(f"{response}"), delim_whitespace=True, header=0, index_col=None)
    print(df_)
    print(df_.columns)
    print(df_.index)

    result = []
    iRow = 0
    for row in df_.index:
        row_ = df_.iloc[iRow]

        iCol = 0
        full_row = {'Index': row}
        for col in df_.columns:
            full_row[col] = row_[iCol]
            iCol = iCol + 1

        result.append(full_row)
        iRow = iRow + 1

    print(json.dumps(result))
    # print(len(df_.columns))
    # print(len(df_.iloc[1]))
    # for i in df_.index:
    #     print(i)

    # df_ = df_.transpose()
    # print(json.loads(df_.to_json()))
